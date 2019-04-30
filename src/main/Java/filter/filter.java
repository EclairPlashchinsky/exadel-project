package filter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = {"/", "/status", "/get", "/check", "/page"})
public class filter implements Filter {

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest)request;
        HttpServletResponse res = (HttpServletResponse)response;
        String method = req.getMethod();
        String url = req.getRequestURL().toString();
        Long workTime = System.currentTimeMillis();

        chain.doFilter(request, response);
        workTime = System.currentTimeMillis() - workTime;
        String result = ("\n" + method + " - " + url + " - " + workTime + "ms");
        res.getOutputStream().print(result);
    }
}