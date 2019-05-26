package bsu.plashchinskyAEV.insta.servlets;

import bsu.plashchinskyAEV.insta.logic.FilterConf;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import bsu.plashchinskyAEV.insta.logic.PostCollection;
import bsu.plashchinskyAEV.insta.logic.PhotoPost;
import bsu.plashchinskyAEV.insta.logic.Example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;

@WebServlet("/posts")
public class PostPageServlet extends HttpServlet {

    //Filter in format: fauhtor and fhashtags ("hashtag1;hashtag2;hashtag3")

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {

        try {
            FilterConf filter = new FilterConf();
            int skip = 0, top = 15;
            String[]hashtags = new String[1];
            hashtags[0] = "0";
            String fa = "", fh = "", fd = "";

            Enumeration<String> names = request.getParameterNames();
            String name, parameter;

            while (names.hasMoreElements()) {

                name = names.nextElement();
                parameter = request.getParameter(name);

                switch (name) {
                    case "skip": {
                        skip = Integer.parseInt(parameter.trim());
                        break;
                    }
                    case "top": {
                        top = Integer.parseInt(parameter.trim());
                        break;
                    }
                    case "fa": {
                        fa = parameter.trim();
                        filter = new FilterConf(fa);
                        break;
                    }
                    case "fh": {
                        fh = parameter.trim();
                        hashtags[0] = fh;
                    }
                    case "fd": {
                        fd = parameter.trim();
                        filter = new FilterConf(Integer.parseInt(fd));
                    }
                    default:
                        break;
                }
            }

            if (!fh.equals("")) {
                String[] rer = fh.split(";");
                filter = new FilterConf(rer);

            }
            synchronized (Example.posts) {
                Gson jsonBuilder = new GsonBuilder().setPrettyPrinting().create();
                String answer = jsonBuilder.toJson(Example.posts.getPage(skip, top, filter));
                response.getOutputStream().println(answer);
            }

        } catch (NumberFormatException error) {
            System.out.println("Incorrect parameters!");
        } catch (IOException error) {
            System.out.println("Input/Output error!");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        doGet(request, response);
    }
}