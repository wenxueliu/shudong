package com.dapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by liuwenxue on 08/05/2018.
 */
@Controller
public class HelloController {
    @RequestMapping("/")
    public String home() {
        return "yueting/sign_up";
    }

    /*
    @RequestMapping("/")
    public String sign_up() {
        return "yueting/sign_up";
    }
    */

    @RequestMapping("/index")
    public String index() {
        return "yueting/index";
    }

    @RequestMapping("/sign_in")
    public String sign_in() {
        return "yueting/sign_in";
    }

   /*
   @RequestMapping(value="postSearch", method= RequestMethod.POST)
   public String postSearch(HttpServletRequest request, RedirectAttributes redirectAttributes) {
       String search = request.getParameter("search");
       if (search.toLowerCase().contains("haha")) {
           redirectAttributes.addFlashAttribute("error", "try using spring instand");
           return "redirect:/";
       }
       redirectAttributes.addAttribute("search", search);
       return "redirect:result";
   }

   public Map<String, Message> getAll() {
       Map<String, Message> applist = new HashMap<>(5);
       applist.put("p1", new Message("u1", "app 1"));
       applist.put("p2", new Message("u2","app 2"));
       applist.put("p3", new Message("u3","app 3"));
       return applist;
   }

    @RequestMapping("/result")
    public String result(Model model, String search, RedirectAttributes redirectAttributes) {
        Map<String, Message> applist = getAll();
        List<String> appkeys = new ArrayList<String>();
        if (search == null || search.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "not exist");
            return "redirect:/";
        } else {
            if (!applist.containsKey(search)) {
                redirectAttributes.addFlashAttribute("error", "not exist");
                return "redirect:/";
            } else {
                appkeys.add(search);
                List<Message> messages = appkeys.stream().map(applist:: get).collect(Collectors.toList());
                model.addAttribute("messages", messages);
                model.addAttribute("search", search);
                return "resultPage";
            }
        }
    }

   @RequestMapping("/list")
   public String list(Model model, String search) {
      Map<String, Message> applist = getAll();
      List<String> appkeys = new ArrayList<String>();
      appkeys.add("p1");
      appkeys.add("p2");
      appkeys.add("p3");

      List<Message> messages = appkeys.stream().map(applist:: get).collect(Collectors.toList());
      model.addAttribute("messages", messages);
      model.addAttribute("search", search);
      return "resultPage";
   }

   @RequestMapping("/dapp")
   @ResponseBody
   public String dapps(@RequestParam(value = "app", defaultValue = "shudong", required = false) String appName, Model model) {
      if (appName.equals("shudong")) {
         return "direct to shudong";
      } else {
         return "not support dapp";
      }
   }

   @RequestMapping("/")

   public class Message {

       public String userId;
       public String date;
       public String text;
       //String imageUrl;

      public Message(String userId, String text) {
         this.userId = userId;
         this.text = text;
         this.date = Instant.now().toString();
      }

      String getUserId() {
          return this.userId;
      }

      String getText() {
         return this.text;
      }

      String getDate() {
         return this.date;
      }
   }
   */
}
