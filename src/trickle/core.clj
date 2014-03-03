(ns trickle.core
  (:gen-class)
  (:require [clj-http.client :as client])
  (:require [clojure.string]))

;;;; Example to download an image
;; (download-file "http://timenewsfeed.files.wordpress.com/2013/12/doge.jpg")
(defn download-file [url filename]
  (let [conn-image (client/get url {:as :byte-array})]
    (with-open [w (clojure.java.io/output-stream filename)]
      (.write w (:body conn-image)))))

(defn get-track-title
  "Takes a body of a given url and extracts the track name.
   Returns the name of the track as a string."
  [body]
  (second (first (re-seq #"<title>(.+) by" body))))

;; Construct download link:
;; https://api.soundcloud.com/tracks/DATA-SC-TRACK/download?client_id=32HASH
;; https://api.soundcloud.com/tracks/69992039/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28


