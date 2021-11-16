package administrador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;

public class Insertar extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String interseccion = request.getParameter("interseccion");
        String maximos = request.getParameter("maximos");
        String inflexion = request.getParameter("inflexion");
        String creciente = request.getParameter("creciente");
        String concava = request.getParameter("concava");
        String funcion = request.getParameter("funcion");

        System.out.println(interseccion + " " + maximos + " " + concava);

        response.setContentType("application/json;charset=UTF-8");
        JSONArray arreglo = new JSONArray();
        Map objeto1 = new HashMap();
        objeto1.put("usuario", "Creado");
        arreglo.add(objeto1);

        try {
            Conexion con = new Conexion();
            Connection conexion = con.conectar();
            Statement st = conexion.createStatement();
            st.executeUpdate("INSERT INTO Usuario(interseccion,maximos,inflexion,creciente,concava,funcion) VALUES('" + interseccion + "','" + maximos + "','" + inflexion + "','" + creciente + "','" + concava + "','" + funcion + "');");

            PrintWriter out = response.getWriter();
            out.println(arreglo);
            out.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}
