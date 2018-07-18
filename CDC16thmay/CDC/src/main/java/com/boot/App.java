package com.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}

//@SuppressWarnings("restriction")
//@EntityScan
//@SpringBootApplication
//public class App extends SpringBootServletInitializer {
//
//@Override
//protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//	System.out.println("Inside SpringApplicationBuilder");
//    return application.sources(App.class).properties("spring.config.name:application");
//}
//
//public static void main(String[] args) throws Exception {
//	new SpringApplicationBuilder(App.class).properties("spring.config.name:application").build().run(args);
//}
//}