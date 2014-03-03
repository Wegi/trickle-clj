(ns trickle.core
  (:gen-class)
  (:require [clj-http.client :as client])
  (:require [clojure.string]))

;;;; Example to download an image 
(defn download-image [url]
  (let [conn-image (client/get url {:as :byte-array})
        filename   (last (clojure.string/split url #"/"))]
    (with-open [w (clojure.java.io/output-stream filename)]
      (.write w (:body conn-image)))))
(download-image "http://timenewsfeed.files.wordpress.com/2013/12/doge.jpg")
