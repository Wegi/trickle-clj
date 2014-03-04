(ns trickle.soundcloud-tests
  (:use midje.sweet)
  (:require [trickle.core :as core]))

(def testbody (core/get-body "https://soundcloud.com/theclerkscologne/the-clerks-mazeltow"))
(def testbody2 (core/get-body "https://soundcloud.com/hardwell/hardwell-live-at-sensation"))

(fact "Test the song-Name exraction"
  (core/get-track-title testbody)
  => "The Clerks Mazeltow FREE DOWNLOAD"
  (core/get-track-title testbody2)
  => "FREE DOWNLOAD: Hardwell live at Sensation Innerspace - Denmark - 29-10-2011")

(fact "Test the track-id exctraction"
  (core/get-track-id testbody)
  => "69992039"
  (core/get-track-id testbody2)
  => "26772050")
