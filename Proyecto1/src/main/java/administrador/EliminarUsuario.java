package administrador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;

public class EliminarUsuario extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json;charset=UTF-8");

        String id = request.getParameter("id");
        JSONArray arreglo = new JSONArray();
        Map objeto1 = new HashMap();
        objeto1.put("usuario", "Eliminado");
        arreglo.add(objeto1);

        try {
            Conexion con = new Conexion();
            Connection conexion = con.conectar();
            Statement st;
            PreparedStatement ps = conexion.prepareStatement("DELETE FROM usuario WHERE id = ?");
            ps.setString(1, id);
            int res = ps.executeUpdate();

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
