/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	if(device.version.substr(0,1)==7){
            $('div[data-role="page"]').css("margin-top", "20px");
        }
    	
    	app.doMyOwnThingsOnDeviceReady();

    	app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
    doMyOwnThingsOnDeviceReady: function(){
    	
    }
};

$(document).on("pageinit","#homepage",function(){
	cards.showCards();
});

$(document).on('pagebeforeshow', '#addpage', function (event) {
	$("#fpass").attr("type", "password");
	if(cards.currentId() != -1){
		cards.showCardById(cards.currentId());
		$("#delete-button").parent().show();
	}else{
		$("#ftitle").val("");
	    $("#furl").val("http://");
	    $("#fuser").val("");
	    $("#fpass").val("");
	    $("#fmemo").val("");
		$("#delete-button").parent().hide();
	}
	
    
    $(".view-button").off("tap").on("tap",function(){
		$("#fpass").attr("type", "password"==$("#fpass").attr("type") ? "text" : "password");
    });
});

$(function(){
	$("#add-or-update-button").on("tap",function(){
		  var item = {
		      title: $("#ftitle").val(),
		      url: $("#furl").val(),
		      username: $("#fuser").val(),
		      password: $("#fpass").val(),
		      memo: $("#fmemo").val()
		  }
		  cards.addOrCard(item);
		  $.mobile.changePage( "#homepage", {transition: "slidedown"});
	});
	
	$("#to-add-button").on("tap",function(){
		cards.setCurrentId(-1);
		$.mobile.changePage( "#addpage", {transition: "slide"});
	});
	
	$("#delete-button").on("tap",function(){
		cards.deleteById(cards.currentId());
		$.mobile.changePage( "#homepage", {transition: "slidedown"});
	});
});







