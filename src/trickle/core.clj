(ns trickle.core
  (:gen-class)
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
  ((client/get (str api-url "/resolve?client_id=" client-id "&url=" url)) :body))

(defn create-info-map
  "Create an Info Hashmap from the XML String."
  [xmlstr]
  (let [stream-url (re-find #"<stream-url>(.*)</stream-url>" xmlstr)]
    {:stream-url (second stream-url)}))

(create-info-map (get-xml "https://soundcloud.com/revealed-recordings/dash-berlin-carita-la-nina-dragonfly-download"))

(defn download-file
  "Download a file from spec. URL into filename."
  [url filename]
  (let [conn-image (client/get url {:as :byte-array})]
    (with-open [w (clojure.java.io/output-stream filename)]
      (.write w (:body conn-image)))))

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
  (let [pattern #".+soundcloud.com/([\w\d-]+)/([\w\d-]+)/?(.*)?$"
        matches (rest (re-find pattern url))]
    {:uploader      (first matches)
     :track-title   (second matches)
     :private-token (last matches)}))

(defn download-free-track
  "Download a free track from soundcloud. Assuming that the client_id does not change at all." 
  [url]
  (let [body (get-body url)
        track-id (get-track-id body)
        song-name (get-track-title body)]
    (download-file
     (str "https://api.soundcloud.com/tracks/"
          track-id
          "/download?client_id=" client-id)
     (str song-name ".wav"))))

(defn download-stream
  [url]
  (let [track-xml (create-info-map (get-xml url))
        stream-url (track-xml :stream-url)
        file-link (str stream-url "?client_id=" client-id)]
    (download-file file-link "test.mp3")))
