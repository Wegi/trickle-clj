(ns trickle.core
  (:require [clj-http.client :as client])
  (:gen-class))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))

(defn print-track-name
  [url]
  (client/get url))
