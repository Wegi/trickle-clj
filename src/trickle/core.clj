(ns trickle.core
  (:gen-class)
  (:require [clj-http.client :as client]))

(defn get-body
  "Get the body of a URL."
  [url]
  ((client/get url) :body))

;;;; Example to download an image
;; (download-file "http://timenewsfeed.files.wordpress.com/2013/12/doge.jpg")
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

(defn download-free-track
  "Download a free track from soundcloud. Assuming that the client_id does not change at all." 
  [url]
  (let [body (get-body url)
        track-id (get-track-id body)
        song-name (get-track-title body)]
    (download-file
     (str "https://api.soundcloud.com/tracks/"
          track-id
          "/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28")
     (str song-name ".wav"))))

