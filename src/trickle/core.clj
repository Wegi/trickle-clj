(ns trickle.core
  (:gen-class)
  (:require [clj-http.client :as client]
            [trickle.soundcloud :as soundcloud]))

(defn download-file
  "Download a file from spec. URL into filename."
  [url filename]
  (let [conn-image (client/get url {:as :byte-array})]
    (with-open [w (clojure.java.io/output-stream filename)]
      (.write w (:body conn-image)))))

(defn get-file
  "Get the correct download lik and file name for corresponding hoster and download the file."
  [url]
  (cond
   (re-seq #".*soundcloud\.com.*" url) (apply download-file (soundcloud/download-info url))
   :otherwise nil))

(defn batch-download
  "Download multiple URLs at once.
The URLs have to be in a file. Each line represents one URL."
  [file]
  (let [urls (slurp file)
        urlvec (clojure.string/split urls #"\n")
        trimmed (map clojure.string/trim urlvec)]
    (doall (map get-file trimmed))))


