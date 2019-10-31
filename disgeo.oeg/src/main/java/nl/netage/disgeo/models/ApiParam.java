package nl.netage.disgeo.models;

public class ApiParam {
	private String type, label, property;

	public ApiParam(String type, String label, String property) {
		this.type = type;
		this.label = label;
		this.setProperty(property);
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}
}
