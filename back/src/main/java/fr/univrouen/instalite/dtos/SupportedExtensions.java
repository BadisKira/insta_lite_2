package fr.univrouen.instalite.dtos;

public enum SupportedExtensions {
    PNG("png"),
    JPEG("jpeg"),
    JPG("jpg"),
    SVG("svg"),
    SVGXML("svg+xml"),
    ICO("ico");

    SupportedExtensions(String extension){
        this.extension = extension;
    }
    private String extension;
    public String getExtension(){
        return extension;
    }
}
