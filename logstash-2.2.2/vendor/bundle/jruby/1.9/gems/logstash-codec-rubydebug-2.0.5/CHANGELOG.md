## 2.0.5
 - monkey patch ActiveSupport in specs so awesome_print does not use a non existing method
## 2.0.4
 - remove LogStash::Timestamp coloring
## 2.0.3
 - Colorize LogStash::Timestamp as green
## 2.0.0
 - Plugins were updated to follow the new shutdown semantic, this mainly allows Logstash to instruct input plugins to terminate gracefully,
   instead of using Thread.raise on the plugins' threads. Ref: https://github.com/elastic/logstash/pull/3895
 - Dependency on logstash-core update to 2.0

