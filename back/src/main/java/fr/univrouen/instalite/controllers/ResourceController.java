package fr.univrouen.instalite.controllers;

import fr.univrouen.instalite.dtos.ResourceDto;
import fr.univrouen.instalite.services.ResourceService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/resource")
public class ResourceController {
    private final ResourceService resourceService;
    public ResourceController(ResourceService resourceService){
        this.resourceService = resourceService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> get(@PathVariable("id") String id) throws MalformedURLException {
        ResourceDto resourceDto = resourceService.getById(id);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + id + "." +resourceDto.getExtension() + "\"").body(resourceDto.getResource());
    }
}
