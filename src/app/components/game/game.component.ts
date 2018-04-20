import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Game, User, Quote } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  Model = new Game();
  Me: User;
  private _api = "http://localhost:8080/game";

  constructor(private http: Http) {
    setInterval(() => this.refresh(), 1000)
  }

  ngOnInit() {
  }

  refresh() {
    this.http.get(this._api + "/state")
      .subscribe(data => this.Model = data.json())
  }

  flipPicture(e: MouseEvent) {
    if (this.IAmTheDealer && !this.IsAnyoneDone) {
      this.http.post(this._api + "/picture", {})
        .subscribe();
    }
  }

  submitQuote(e: MouseEvent, text: string) {
    e.preventDefault();

    if (this.MyPlayedQuote() || this.IAmTheDealer) return;

    this.http.post(this._api + "/quotes", { Text: text, PlayerId: this.Me.Name })
      .subscribe(data => {
        if (data.json().success) {
          this.Me.MyQuotes.splice(this.Me.MyQuotes.indexOf(text), 1);
        }
      });
  }

  selectQuote(e: MouseEvent, text: string) {
    //potentially add delay for chosen animation to play
     e.preventDefault();
    
    if(!this.IAmTheDealer || !this.IsEveryoneDone) return;

    this.http.post(this._api + "/select", {Text: text})
    .subscribe(data => {
      if (data.json().success) {
        this.Me.MyQuotes.splice(this.Me.MyQuotes.indexOf(text), 1);
      }
    });
  }

  login(name: string) {
    //prevent names of <1 character
    //new users logged server-side
    this.http.get(this._api + "/quotes", { params: { playerId: name } })
      .subscribe(data => this.Me = { Name: name, MyQuotes: data.json()});
  }

  MyPlayedQuote = () => this.Model.PlayedQuotes.find(x => x.PlayerId == this.Me.Name);
  ChosenQuote = () => this.Model.PlayedQuotes.find(x => x.Chosen);
  IsEveryoneDone = () => this.Model.PlayedQuotes.length == this.Model.Players.length - 1; //-1 for dealer
  IsAnyoneDone = () => this.Model.PlayedQuotes.length >= 1;
  IAmTheDealer = () => this.Me.Name == this.Model.DealerId;
}