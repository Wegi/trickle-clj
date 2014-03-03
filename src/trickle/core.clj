(ns trickle.core
  (:gen-class)
  (:require [clj-http.client :as client])
  (:require [clojure.string]))

;;;; Example to download an image
;; (download-file "http://timenewsfeed.files.wordpress.com/2013/12/doge.jpg")
(defn download-file [url]
  (let [conn-image (client/get url {:as :byte-array})
        filename   (last (clojure.string/split url #"/"))]
    (with-open [w (clojure.java.io/output-stream filename)]
      (.write w (:body conn-image)))))

(defn download-free-track
  "Download a free track from soundcloud. Still in testing due to unknown client_id"
  [url target-uri]
  (let [html ((client/get url) :body)
        matches (re-seq #"data-sc-track=\"(\d+)\"" html)
        track-id (second (first matches))]
    (spit target-uri (client/get
                      (str "https://api.soundcloud.com/tracks/"
                           track-id
                           "/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28")))))


(download-free-track "https://soundcloud.com/theclerkscologne/play-skatalites-garden-of-love" "clerks.wav")
