package administrador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;

public class login extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("entra");
        String nombre = request.getParameter("nombre");
        String password = request.getParameter("password");
        System.out.println(nombre + password);
        response.setContentType("application/json;charset=UTF-8");
        JSONArray arreglo = new JSONArray();
        System.out.println("entra3");
        String sql = "SELECT * FROM ingresar where username = '" + nombre + "' and password= '" + password + "'";
        System.out.println("entra4");

        try {
            Conexion con = new Conexion();
            Connection conexion = con.conectar();
            Statement st;
            st = conexion.createStatement();
            ResultSet result = st.executeQuery(sql);

            while (result.next()) {
                Map objeto1 = new HashMap();

                objeto1.put("password", result.getString("password"));

                arreglo.add(objeto1);
            }
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
