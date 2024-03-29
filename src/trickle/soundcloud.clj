(ns trickle.soundcloud
  (:require [clj-http.client :as client]))


(def client-id "b45b1aa10f1ac2941910a7f0d10f8e28")
(def api-url "http://api.soundcloud.com")

(defn get-body
  "Get the body of a URL."
  [url]
  ((client/get url) :body))

(defn get-xml
  "Grabs the Track Info in XML form from the API."
  [url]
  ((client/get (str api-url "/resolve?client_id=" client-id
                    "&url=" url)) :body))

(defn downloadable?
  "Return a truthy or falsey value, regarding the track being a free download or not. Input
should be the track XML."
  [xml]
  (re-find #"<downloadable type=\"boolean\">true</downloadable>" xml))

(defn get-stream-url
  "Get the Stream-URL from the XML String."
  [xmlstr]
  (let [stream-url (re-find #"<stream-url>(.*)</stream-url>" xmlstr)]
    (second stream-url)))

(defn get-track-id
  "Get the track id, given an html body from soundcloud."
  [body]
  (let [matches (re-seq #"data-sc-track=\"(\d+)\"" body)
        track-id (second (first matches))]
    track-id))

(defn get-track-title
  "Takes a body of a given url and extracts the track name.
   Returns the name of the track as a string."
  [body]
  (second (first (re-seq #"<title>(.+) by" body))))

(defn extract-dl-info
  "Extracts data needed for the download of a stream from the permalink-URL."
  [url]
  (let [pattern #".+soundcloud.com/([\w\d-]+)/([\w\d-]+)/?(.*)?[#.*]?$"
        matches (rest (re-find pattern url))]
    {:uploader      (first matches)
     :track-title   (second matches)
     :private-token (last matches)}))


;;;; Download section

(defn download-free-track
  "Download a free track from soundcloud. Assuming that the client_id does not change at all." 
  [url]
  (let [body (get-body url)
        track-id (get-track-id body)
        song-name (get-track-title body)
        private-token ((extract-dl-info url) :private-token)]
    [(str "https://api.soundcloud.com/tracks/"
          track-id
          "/download?client_id=" client-id "&secret_token=" private-token)
     (str song-name ".wav")]))

(defn download-stream
  [url]
  (let [stream-url (get-stream-url (get-xml url))
        info (extract-dl-info url)
        private-token (info :private-token)
        sec-symbol (if (some #{\?} stream-url) "&" "?")
        file-link (str stream-url sec-symbol "client_id=" client-id)
        title (info :track-title)]
    [file-link (str title ".mp3")]))

(defn download-info
  "Return the download Link and filename to the core."
  [url]
  (let [xml (get-xml url)]
    (if (downloadable? xml)
      (download-free-track url)
      (download-stream url))))
