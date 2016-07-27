# ELK(ElasticSearch)Stack + 서울시 공공데이터 활용

![대시보드](https://github.com/SeeArtSun/ELK-analysis/blob/master/img/elk-seoul-subway.png?raw=true)

### ELK = ElasticSearch + Logstash + Kibana
> - ElasticSearch : Apach Lucene 기반의 실시간 분산 검색 엔진
> - Logstash : 로그를 JSON 형태로 만들어 ElasticSearch로 전달
> - Kibana : ElasticSearch에 저장된 Data를 Dashboard 형태로 보여주는 Solution


## Projact Download & Setup the Environment

```
$ git clone https://github.com/SeeArtSun/ELK-analysis.git
$ npm install
```
Java 1.8.0_37, Elasticsearch 2.2.0, Logstash 2.2.2 and Kabana 4.4.1 are used to setup the environment.


## 1. 실행방법
### 1.1 공공데이터 변환
- 다음 명령어 실행하면 data/ 디렉토리 아래에 1to4_{YYYYMMDD}.log / 5to8_{YYYYMMDD}.log 형식으로 1~4/5~8호선 승하차 로그 파일 생성됨
```
$ node convert2log/convert_1to4.js
$ node convert2log/convert_5to8.js
```
- 공공데이터 제공처 : [서울 열린 데이터광장](http://data.seoul.go.kr)([서울메트로](http://www.seoulmetro.co.kr/))

### 1.2 서버활성화

```
$ sh start.sh

또는

$ elasticsearch-2.2.0/bin/elasticsearch -d -p es.pid
$ logstash-2.2.2/bin/logstash -f logstash-2.2.2/logstash.conf
$ kibana-4.4.1-darwin-x64/bin/kibana
```

### 1.3 포트정보

- ElasticSearch Port is set to [9200]
> ex) http://localhost:9200/_plugin/head - ElasticSearch Cluster Monitor

![ElasticSearch](https://github.com/SeeArtSun/ELK-analysis/blob/master/img/elk-cluster.png?raw=true)

- Kibana Server Port is set to [5601]
> ex) http://localhost:5601/

### 1.4 Kibana Dashboard 확인
> 시간설정 2014년(2014/01/01 ~ 2014/12/31)으로 변경 후 Visualize Or Dashboard 메뉴 활용

## 2. 디렉토리 구조

> convert2log - 공공데이터 convert
>>> data - 변환 데이터(*.log)
>>> source - 원천 데이터
>> convert_1to4.js, convert_5to8.js - 데이터 변환 프로그램
> elasticsearch-2.2.0 - ElasticSearch
> logstash-2.2.2 - Logstash
> kibana-4.4.1-darwin-x64


