package com.example.soapapi;


import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface AccountService {

    @WebMethod
    double getBalance(String accountId);

    @WebMethod
    String transferFunds(String fromAccount, String toAccount, double amount);

    @WebMethod
    String getTransactions(String accountId);
}