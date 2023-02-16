/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2019 Adobe
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 'use strict';

 class PopBot {
     constructor(props) {
         this._installEvents();
         this._nounLength = nouns.length;
         
     }
 
     /**
      * Installs events listeners
      * @private
      */
     _installEvents() {
         document
             .querySelector(PopBot.selectors.askButton)
             .addEventListener('click', event => this._handleAskClick(event));
     }
 
     _handleAskClick(event) {
        event.preventDefault();
        console.log("answer space changed");
        console.log("nouns ", nouns[36]);
        this._setAnswerSpace("Hello, I am PopBot. I am here to help you with your questions. Please ask me a question.");
     }

     _setAnswerSpace(answer) {
        document.querySelector(PopBot.selectors.responseArea).innerHTML = answer;
     }

     _getRandomNoun() {
            const nounLength = nouns.length;
     }

     _getRandomAdjective() {

     }

     _getRandomAdverb() {

     }

     _getRandomVerb() {

     }

     _getRAndomPreposition() {

     }

 }
 
PopBot.selectors = {
     askButton: '#button-ask',
     responseArea: '#response-area',
 };
 
 PopBot.events = {
     variantChanged: 'variantchanged'
 };
 
 (function(document) {
     function onDocumentReady() {
         const popbot = new PopBot();
     }
 
     if (document.readyState !== 'loading') {
         onDocumentReady();
     } else {
         document.addEventListener('DOMContentLoaded', onDocumentReady);
     }
 })(window.document);
 