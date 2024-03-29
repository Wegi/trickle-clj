(defproject trickle "0.1.0-SNAPSHOT"
  :description "Library for downloading Songs from Soundcloud."
  :url "http://example.com/FIXME";TODO
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [clj-http "0.9.0"]
                 [midje "1.6.2"]]
  :main ^:skip-aot trickle.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}
             :dev {:dependencies [[midje "1.6.2"]]
                   :plugins [[lein-midje "3.1.3"]]}})
