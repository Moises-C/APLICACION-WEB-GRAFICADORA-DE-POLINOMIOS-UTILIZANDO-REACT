package administrador;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;

public class JSON extends HttpServlet 
{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException 
    {
        response.setContentType("application/json;charset=UTF-8");
        JSONArray arreglo = new JSONArray();  
   
 
        Map objeto1=new HashMap();    
        objeto1.put("codigo",1);    
        objeto1.put("descripcion","uvas");    
        objeto1.put("precio",50);   
        Map objeto2=new HashMap();    
        objeto2.put("codigo",2);    
        objeto2.put("descripcion","manzanas");    
        objeto2.put("precio",30);        
        
        
        Map objeto12=new HashMap();    
        objeto12.put("codigo",12);    
        objeto12.put("descripcion","peras");    
        objeto12.put("precio",500);   
        Map objeto22=new HashMap();    
        objeto22.put("codigo",22);    
        objeto22.put("descripcion","carros");    
        objeto22.put("precio",300);        
         
         arreglo.add(objeto1);
         arreglo.add(objeto2); 
         arreglo.add(objeto12); 
         arreglo.add(objeto22); 
         
         
            PrintWriter out = response.getWriter();
            out.println(arreglo);
            out.close();
    }


}
