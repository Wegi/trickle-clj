(ns trickle.soundcloud-tests
  (:use midje.sweet)
  (:require [trickle.soundcloud :as soundcloud]))

(def testbody
  (soundcloud/get-body "https://soundcloud.com/theclerkscologne/the-clerks-mazeltow"))
(def testbody2
  (soundcloud/get-body "https://soundcloud.com/hardwell/hardwell-live-at-sensation"))
(def testxml
  (soundcloud/get-xml "https://soundcloud.com/revealed-recordings/dash-berlin-carita-la-nina-dragonfly-download"))
(def testxml2
  (soundcloud/get-xml "https://soundcloud.com/theclerkscologne/the-clerks-mazeltow"))

(fact "Test the XML-Info generation"
  (soundcloud/get-stream-url testxml)
  => "http://api.soundcloud.com/tracks/135737624/stream")

(fact "Test the song-Name exraction"
  (soundcloud/get-track-title testbody)
  => "The Clerks Mazeltow FREE DOWNLOAD"
  (soundcloud/get-track-title testbody2)
  => "FREE DOWNLOAD: Hardwell live at Sensation Innerspace - Denmark - 29-10-2011")

(fact "Test the track-id exctraction"
  (soundcloud/get-track-id testbody) => "69992039"
  (soundcloud/get-track-id testbody2) => "26772050")

(fact "Test the extraction of needed Metadata"
  (soundcloud/extract-dl-info "https://soundcloud.com/revealed-recordings/dash-berlin-carita-la-nina-dragonfly-download")
  => {:uploader "revealed-recordings",
      :track-title "dash-berlin-carita-la-nina-dragonfly-download",
      :private-token ""}
  (soundcloud/extract-dl-info "https://soundcloud.com/wegi-productions/1337-mlgpro/dh3289ez-a3")
  => {:uploader "wegi-productions"
      :track-title "1337-mlgpro"
      :private-token "dh3289ez-a3"})

(fact "Test downloadable?"
  (soundcloud/downloadable? testxml)
  => falsey
  (soundcloud/downloadable? testxml2)
  => truthy)
