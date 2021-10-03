'use strict';

/*let text = `One: 'Hi Mary.'
Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`;

//console.log(text.replace(/'+/g, '"'));  первое задание

console.log(text.replace(/\B'/g, '"'));  //второе задание
*/

class Forma {
   constructor(name = document.querySelector(".in-name"), tel = document.querySelector(".in-tel"), email = document.querySelector(".in-email"), text = document.querySelector(".in-text")) {
      this.name = name;
      this.tel = tel;
      this.email = email;
      this.text = text;
      this.submit();
   }
   submit() {
      document.querySelector('button').addEventListener('click', () => {
         if (/[a-z]+/i.test(this.name.value)) {
            this.name.classList.remove("error-input")
         } else { this.name.classList.add("error-input"); }
         if (/\+\d\(\d+\)\d+\-\d+/.test(this.tel.value)) {
            this.tel.classList.remove("error-input")
         } else { this.tel.classList.add("error-input"); }
         if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(this.email.value)) {
            this.email.classList.remove("error-input")
         } else { this.email.classList.add("error-input"); }
         if (/\w+/.test(this.text.value)) {
            this.text.classList.remove("error-input")
         } else { this.text.classList.add("error-input"); }
      });
   }
}


new Forma