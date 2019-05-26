package bsu.plashchinskyAEV.insta.servlets;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import bsu.plashchinskyAEV.insta.logic.PostCollection;
import bsu.plashchinskyAEV.insta.logic.PhotoPost;
import bsu.plashchinskyAEV.insta.logic.Example;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@WebServlet("/post")
public class PostServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {

        try {

            if (request.getParameter("id") == null) {
                response.getOutputStream().print("Input an id!");
            }

            String id = request.getParameter("id").trim();
            synchronized (Example.posts) {

                if (Example.posts.get(id) != null) {
                    Gson jsonBuilder = new GsonBuilder().setPrettyPrinting().create();
                    String answer = jsonBuilder.toJson(Example.posts.get(id));
                    response.getOutputStream().println(answer);
                } else {
                    response.getOutputStream().println("There is no such post!");
                }
            }
        } catch (NumberFormatException error) {
            System.out.println("Incorrect id!");
        } catch (IOException error) {
            System.out.println("Output error!");
        }
    }

    private boolean addPhoto(HttpServletRequest request)
            throws NumberFormatException {

        String[] lik = new String[0];
        String id = "";
        String author = "", description = "", photoPath = "";
        String hashtags[] = new String[0];

        Enumeration<String> names = request.getParameterNames();
        String name, parameter;

        while (names.hasMoreElements()) {

            name = names.nextElement();
            parameter = request.getParameter(name);

            switch (name) {
                case "id": {
                    id = parameter.trim();
                    break;
                }
                case "author": {
                    author = parameter.trim();
                    break;
                }
                case "description": {
                    description = parameter.trim();
                    break;
                }
                case "photoPath": {
                    photoPath = parameter.trim();
                    break;
                }
                case "hashtags": {
                    hashtags = (parameter.trim().split(";"));
                    break;
                }
                case "likes": {
                    lik = (parameter.trim().split(";"));
                }
                default: break;
            }
        }

        if (author.equals("") || photoPath.equals("")) {
            throw new NumberFormatException();
        }

        synchronized (Example.posts) {
            return Example.posts.add(new PhotoPost(id, description, new Date(), author, photoPath, hashtags, lik));
        }
    }

    private boolean editPhoto(HttpServletRequest request)
            throws NumberFormatException {
        String id = "0";
        String description = "0", photoPath = "0";
        String hashtags[] = new String[1];
        hashtags[0] = "0";

        Enumeration<String> names = request.getParameterNames();
        String name, parameter;

        while (names.hasMoreElements()) {

            name = names.nextElement();
            parameter = request.getParameter(name);

            switch (name) {
                case "id": {
                    id = (parameter.trim());
                    break;
                }
                case "description": {
                    description = parameter.trim();
                    break;
                }
                case "photoPath": {
                    photoPath = parameter.trim();
                    break;
                }
                case "hashtags": {
                    hashtags = (parameter.trim().split(","));
                    break;
                }
                default: break;
            }
        }

        synchronized (Example.posts) {
            return Example.posts.edit(id, new PhotoPost(description, photoPath, hashtags));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {

        try {

            request.setCharacterEncoding("UTF-8");
            String action = request.getParameter("action");

            if (action == null) {
                System.out.println("Request doesn't have parameter action!");
                return;
            }

            if (action.equals("add")) {
                System.out.println("in add");
                if (addPhoto(request)) {
                    System.out.println("added");
                    response.getOutputStream().println("Successful addition!");
                } else {
                    System.out.println("not added");
                    response.getOutputStream().println("Invalid post!");
                }

            } else if (action.equals("edit")) {

                if (editPhoto(request)) {
                    response.getOutputStream().println("Successful edition!");
                } else {
                    response.getOutputStream().println("Invalid post!");
                }

            } else {
                throw new IOException();
            }

        } catch (IOException error) {
            System.out.println("Input/Output error!");
        } catch (NumberFormatException error) {
            System.out.println("Incorrect parameters!");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        try {

            if (request.getParameter("id") == null) {
                response.getOutputStream().print("Input an id!");
            }

            String id = request.getParameter("id").trim();

            synchronized (Example.posts) {

                if (Example.posts.get(id) != null) {
                    Example.posts.remove(id);
                    response.getOutputStream().println("Successful removing!");
                } else {
                    response.getOutputStream().println("There is no such post!");
                }
            }
        } catch (NumberFormatException error) {
            System.out.println("Incorrect id!");
        } catch (IOException error) {
            System.out.println("Output error!");
        }
    }
}