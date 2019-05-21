package bsu.plashchinskyAEV.insta.servlets;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//branch test

@WebServlet("/get")

public class GetNameServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            ServletException, IOException {
        String name = request.getParameter("name");
        if(name != null && name.length() < 101){
            response.getOutputStream().print("Name is " + name);
        }
        else {
            response.getOutputStream().print("Name is unappropriate");
        }
    }
}

