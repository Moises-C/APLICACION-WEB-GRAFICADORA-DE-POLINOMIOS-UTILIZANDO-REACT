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

public class VerUsuario extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        System.out.println("entra");
        String id = request.getParameter("id");
 System.out.println("entra2");
       response.setContentType("application/json;charset=UTF-8");
        JSONArray arreglo = new JSONArray();  
  System.out.println("entra3"); 
        System.out.println(id);
        String sql = "SELECT * FROM usuario where id = "+id+"";
         System.out.println("entra4");
        
    try
    {
        Conexion con = new Conexion();
        Connection conexion = con.conectar();
        Statement st;
        st = conexion.createStatement();
        ResultSet result = st.executeQuery(sql);
        
        while(result.next()){
            Map objeto1=new HashMap(); 
            
            objeto1.put("id",result.getInt("id"));  
            objeto1.put("nombre",result.getString("nombre"));  
            objeto1.put("paterno",result.getString("paterno"));
            objeto1.put("materno",result.getString("materno"));
            objeto1.put("interseccion",result.getString("interseccion"));
            objeto1.put("maximos",result.getString("maximos"));
            objeto1.put("inflexion",result.getString("inflexion"));
            objeto1.put("creciente",result.getString("creciente"));
            objeto1.put("concava",result.getString("concava"));
            objeto1.put("funcion",result.getString("funcion"));
            
            arreglo.add(objeto1);
        }
      PrintWriter out = response.getWriter();
            out.println(arreglo);
            out.close();   
    
    }
    catch(Exception e)
    {
    e.printStackTrace();
    } 
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }


}
