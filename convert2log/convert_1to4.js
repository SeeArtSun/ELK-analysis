var fs = require('fs');
var parse = require('csv-parse');

var sInfo = fs.readFileSync('source/station.json', 'utf8');
var sLocation = JSON.parse(sInfo).DATA;
//console.log(sLocation.DATA.length);

var s_meta = new Object();
for(var i = 0; i < sLocation.length; i++){
  if(sLocation[i].XPOINT_WGS !== ""){
    //"서울" 은 "서울역" 으로 이름 변경.
    if(sLocation[i].STATION_NM === "서울"){
      sLocation[i].STATION_NM = "서울역"
    }
    s_meta[sLocation[i].STATION_NM] = {
      "STATION_CD" : sLocation[i].STATION_CD,
      "STATION_NM" : sLocation[i].STATION_NM,
      "LINE_NUM" : Number(sLocation[i].LINE_NUM),
      "FR_CODE" : sLocation[i].FR_CODE,
      "GEO_X" : Number(sLocation[i].XPOINT_WGS),
      "GEO_Y" : Number(sLocation[i].YPOINT_WGS)
    }
  }
}

var f1to4 = fs.readFileSync('source/1to4.csv', 'utf8');
parse(f1to4, {comment:"#"}, function(csv_err, csv_data){
  if (csv_err) {
    return console.log(csv_err);
  }
  //console.log(csv_data.length);
  // console.log("%j",csv_data[0]);
  // console.log("%j",csv_data[1]);
  // console.log("%j",csv_data[2]);
  //[날짜,호선,역명,구분,00~01,01~02,02~03,03~04,04~05,05~06,06~07,07~08,08~09,09~10,10~11,11~12,12~13,13~14,14~15,15~16,16~17,17~18,18~19,19~20,20~21,21~22,22~23,23~24,합계]
  //["2014-02-24","3호선","종로3가(319)","승차"," 16 "," - "," - "," - "," 1 "," 26 "," 29 "," 58 "," 125 "," 156 "," 261 "," 293 "," 401 "," 475 "," 562 "," 660 "," 983 "," 967 "," 1,643 "," 1,621 "," 884 "," 675 "," 505 "," 165 "," 10,506 "]

  var sDiffNames = {
    "총신대입구" : ["총신대입구(이수)","총신대입구(이수)"]
  }

  for(var cd=1; cd< csv_data.length ; cd+=2){
    var dataIn = csv_data[cd];
    var dataOut = csv_data[cd+1];
    if(dataIn[0]===dataOut[0] && dataIn[1]===dataOut[1] && dataIn[2]===dataOut[2]){
      var lStationName;
      if(dataIn[2].indexOf("(") > 0){
        lStationName = dataIn[2].substr(0,dataIn[2].indexOf("("));
      } else {
        lStationName = dataIn[2];
      }
      //console.log(lStationName);


      var station_name = "";
      if(!s_meta[lStationName]){
        station_name = sDiffNames[lStationName][0];
        //sRiders[j].SUB_STA_NM = sDiffNames[lStationName][0];
      } else {
        station_name = lStationName;
      }

      var ldateTemp = dataIn[0].split('-');
      // console.log(Number(ldateTemp[0]));
      // console.log(Number(ldateTemp[1]));
      // console.log(Number(ldateTemp[2]));
      for(var h=0; h < 24; h++){
        var ldate = new Date(ldateTemp[0],Number(ldateTemp[1])-1,ldateTemp[2],h);
        // console.log("%j"+ldate);
        // - 로 되어 있는 값들 0으로 변경.
        var people_in = dataIn[4+h];
        people_in = people_in.trim();
        if(people_in === "-"){ people_in = "0"; }
        people_in = people_in.replace(/,/g,"");
        //console.log(people_in);
        people_in = Number(people_in);

        var people_out = dataOut[4+h];
        people_out = people_out.trim();
        if(people_out === "-"){ people_out = "0"; }
        people_out = people_out.replace(/,/g,"");
        //console.log(people_out);
        people_out = Number(people_out);

        var s_logs = {
          "time_slice" : ldate,
          "line_num" : dataIn[1],
          "station_name" : station_name,
          "station_code" : s_meta[station_name].STATION_CD,
          "station_geo" : {
            "lat" : s_meta[station_name].GEO_X,
            "lon" : s_meta[station_name].GEO_Y
          },
          "people_in" : people_in,
          "people_out" : people_out,
          "total" : people_in + people_out
        }

        //console.log("%j",s_logs);
        //console.log(ldate.toISOString().slice(0,10).replace(/-/g,""));
        var fileName = "1to4_"+ldateTemp[0]+ldateTemp[1]+ldateTemp[2]+".log";
        //var fileName = "1to4_"+ldate.toISOString().slice(0,10).replace(/-/g,"")+".log";
        var logdata = JSON.stringify(s_logs)+"\n";
        fs.appendFileSync("data/"+fileName, logdata);
      }

    }

  }

});
