// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { FaqModel } from '@models/index';

export default class FaqService {
  private FaqModel = FaqModel;

  //Author : Impana
  //Creates new product item added to the cart
  public async createFaq(newFaqInput: {
    question: string;
    answer: number;
  }) {
    try {
      const {
        question,
        answer
      } = newFaqInput;
  
      const newFaq = await this.FaqModel.create({
        question,
        answer
      });
  
      const response = {
        newFaq
      };
  
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async getAllFaq() {
    try {
      const response = await this.FaqModel.find();
      if (!response) {
        throw new HttpException(400, 'ID not Exist');
      }
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async deletFaq(Id: string) {
    try {
      const Faq = await this.FaqModel.findOneAndDelete({ _id: Id });
      if (!Faq) {
        throw new HttpException(400, 'ID not Exist');
      }
      await this.FaqModel.findByIdAndRemove(Id);
      const response = {
        message: 'FaqModel data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async updatefaqById(Id:string,updatedfaqData:any) {
    try {
      const faq = await this.FaqModel.findById(Id);

      if (!faq) {
        throw new HttpException(400, 'faq not found');
      } else {
        if (updatedfaqData.question) {
          faq.question = updatedfaqData.question;
        }
        if (updatedfaqData.answer) {
          faq.answer = updatedfaqData.answer;
        }
        const updatedfaq = await faq.save();
        return updatedfaq
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
}
