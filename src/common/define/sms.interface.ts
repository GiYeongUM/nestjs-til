export interface SmsParam {
  title: string;
  content: string;
  nameReceive: string[];
  nameSender: string;
  smsReceivePhoneNo: string[];
  smsSenderPhoneNo: string;
}

export interface ResponseSmsModel {
  result: boolean;
  resultMsg: string;
}
