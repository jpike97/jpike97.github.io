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
         this._nounsLength = nouns.length;
         this._adverbsLength = adverbs.length;
         this._prepositionsLength = prepositions.length;
         this._adjectivesLength = adjectives.length;
         this._verbsLength = verbs.length;
     }
 
     /**
      * Installs events listeners
      * @private
      */
     _installEvents() {
         document
             .querySelector(PopBot.selectors.askButton)
             .addEventListener('click', event => this._handleAskClick(event));
         document
         .querySelector(PopBot.selectors.askArea)
         .addEventListener('focus', event => this._handleAskFocus(event));
     }

     _handleAskFocus(event) {
        console.log("focused!");
        this._setAnswerSpace('Popbot waiting...')
     }

     _isVowel(c) {
        return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1;
     }
     
     _isLowerCase(c) {
        return c == c.toLowerCase() && c != c.toUpperCase();
     }

     _generatePopAnswer() {
        let isVowel = false;
        const vowelCheckAdjective = this._getRandomAdjective();

        if (this._isVowel(vowelCheckAdjective[0])) {
            isVowel = true;
        }
        

        const unformattedAnswer = `When the ${this._getRandomNoun()} ${this._getRandomVerb()}s 
        ${this._getRandomAdverb()} ${this._getRandomPreposition()} the ${this._getRandomAdjective()} ${this._getRandomNoun()} 
        of ${isVowel ? 'an' : 'a'} ${vowelCheckAdjective} ${this._getRandomNoun()}`;

        const formattedAnswer = unformattedAnswer.replaceAll('_', ' ');
    
        return formattedAnswer;
     }
 
     _handleAskClick(event) {
        event.preventDefault();
        if (document.querySelector(PopBot.selectors.askArea).value === '') {
            this._setAnswerSpace('Ask a question!!');
            return;
        }   
        const popAnswer = this._generatePopAnswer();
        this._setAnswerSpace(popAnswer);
     }

     _setAnswerSpace(answer) {
        document.querySelector(PopBot.selectors.responseArea).innerHTML = answer;
     }

     _getRandomNumber(endOfRange) {
        console.log("random number is ", Math.random());
        return Math.floor(Math.random() * (endOfRange + 1));
     }

     _getRandomNoun() {
            const randomIndex = this._getRandomNumber(this._nounsLength);
            if (this._isLowerCase(nouns[randomIndex][0])) {
                return nouns[randomIndex];
            }
            else {
                return this._getRandomNoun();
            }
     }

     _getRandomAdjective() {
        const randomIndex = this._getRandomNumber(this._adjectivesLength);
        return adjectives[randomIndex];
     }

     _getRandomAdverb() {
        const randomIndex = this._getRandomNumber(this._adverbsLength);
        return adverbs[randomIndex];
     }

     _getRandomVerb() {
        const randomIndex = this._getRandomNumber(this._verbsLength);
        return verbs[randomIndex];
     }

     _getRandomPreposition() {
        const randomIndex = this._getRandomNumber(this._prepositionsLength);
        return prepositions[randomIndex];
     }

 }
 
PopBot.selectors = {
     askButton: '#button-ask',
     responseArea: '#response-area',
     askArea: '#popbotinput'
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
 