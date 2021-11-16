package administrador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;

public class ObtenerInfo extends HttpServlet 
{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException 
    {
        
        response.setContentType("application/json;charset=UTF-8");
        JSONArray arreglo = new JSONArray();  
  
 
        String sql = "SELECT * FROM usuario";
        
        
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
