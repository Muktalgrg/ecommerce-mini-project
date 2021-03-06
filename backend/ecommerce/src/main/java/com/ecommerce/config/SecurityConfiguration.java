package com.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // protect endpoint /api/orders
        http.authorizeRequests()
                .antMatchers("/api/orders/**")// protecting the endpoint
                .authenticated()
                .and()
                .oauth2ResourceServer() // configuring oauth support
                .jwt();  // enable jwt encoded bearer token support

        // add cors filters
        http.cors();

        // force a non-empty response body for 401's to make the response more friendly
        Okta.configureResourceServer401ResponseBody(http);

        // we are not using sessions for cookie tracking
        // rest api are stateless
        // disable csrf
        http.csrf().disable();
    }
}
