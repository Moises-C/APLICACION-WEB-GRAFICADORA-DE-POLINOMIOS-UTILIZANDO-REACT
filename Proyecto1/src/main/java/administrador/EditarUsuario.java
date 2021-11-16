package administrador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;

public class EditarUsuario extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {


        String id = request.getParameter("id");
        String interseccion = request.getParameter("interseccion");
        String maximos = request.getParameter("maximos");
        String inflexion = request.getParameter("inflexion");
        String creciente = request.getParameter("creciente");
        String concava = request.getParameter("concava");
        String funcion = request.getParameter("funcion");
        
          response.setContentType("application/json;charset=UTF-8");

  
          System.out.println("entra a la edicion");
          JSONArray arreglo = new JSONArray();  
           Map objeto1=new HashMap(); 
           objeto1.put("usuario","Editado"); 
           arreglo.add(objeto1);
    
        System.out.println(interseccion+maximos+inflexion+id);

        try {
            Conexion con = new Conexion();
            Connection conexion = con.conectar();
            Statement st;
            PreparedStatement ps = conexion.prepareStatement("UPDATE usuario SET interseccion='" + interseccion + "', maximos='" + maximos + "' , inflexion='" + inflexion + "' , concava='" + concava + "' , creciente='" + creciente + "' , funcion='" + funcion + "'  where id = "+ id +"");
            ps.executeUpdate();

              PrintWriter out = response.getWriter();
            out.println(arreglo);
            out.close(); 
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
