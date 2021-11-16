package administrador;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CrearUsuario extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Crear Usuario</title>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1>Crear nuevo usuario</h1>");
        out.println("<form action='Insertar' method='get'>");
        out.println("Nombre: <input name='nombre' type='text' /> <br />");
        out.println("Apellido paterno: <input name='paterno' type='text' /> <br />");
        out.println("Apellido materno: <input name='materno' type='text' /> <br />");
        out.println("Password: <input name='password' type='text' /> <br />");
        out.println("<input type='submit' />");
        out.println("</form>");
        out.println("</body>");
        out.println("</html>");
    }

}
