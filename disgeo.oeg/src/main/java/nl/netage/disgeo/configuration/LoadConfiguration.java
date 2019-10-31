package nl.netage.disgeo.configuration;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.annotation.WebListener;

@WebListener
public class LoadConfiguration implements javax.servlet.ServletContextListener {

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		
		try {
			ServletContext context = sce.getServletContext();
			Configuration.loadConfiguration(context);
		} catch (Exception e) {
			//Configuration.LOGGER.catching(e);
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub

	}
}
