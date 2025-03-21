import {faqInterface} from "@interfaces/index"

//Author : Srinivas
export default class CartModel {
  private _question: string;
  private _answer:string;
 
  constructor({
    question='',
    answer=''
  }) {

    this._question= question;
    this._answer = answer;
  }

  
  setquestion(value: string): void {
    this._question = value || null;
  }
  setanswer(value: string): void {
    this._answer = value || null;
  }
 
  
  getquestion  = (): string | null => this._question ;
  getanswer = (): string | null => this._answer;


  getEntityMappings() {
    return {
        question : this.getquestion(),
      answer: this.getanswer(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()

      
    };
  }
}
