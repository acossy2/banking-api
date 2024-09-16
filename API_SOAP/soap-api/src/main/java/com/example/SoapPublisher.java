package com.example;

import javax.xml.ws.Endpoint;

import com.example.soapapi.AccountServiceImpl;

public class SoapPublisher {

    public static void main(String[] args) {
        Endpoint.publish("http://localhost:8080/ws/account", new AccountServiceImpl());
        System.out.println("SOAP Web Service started on http://localhost:8080/ws/account");
    }
}