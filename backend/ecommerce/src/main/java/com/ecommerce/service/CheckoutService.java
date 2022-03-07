package com.ecommerce.service;

import com.ecommerce.dto.Purchase;
import com.ecommerce.dto.PurchaseResponse;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
