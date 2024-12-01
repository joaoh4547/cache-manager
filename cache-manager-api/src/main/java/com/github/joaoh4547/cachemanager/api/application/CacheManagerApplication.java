package com.github.joaoh4547.cachemanager.api.application;

import com.github.joaoh4547.cachemanager.api.config.DependencyBinder;
import com.github.joaoh4547.cachemanager.api.config.ValidationConfigurationContextResolver;
import com.github.joaoh4547.cachemanager.api.filters.BlockWadlFilter;
import io.swagger.v3.jaxrs2.integration.resources.OpenApiResource;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.server.validation.ValidationFeature;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("/api")
public class CacheManagerApplication extends ResourceConfig {

    public CacheManagerApplication() {
        packages("com.github.joaoh4547.cachemanager.api");
        property("jersey.config.server.wadl.disableWadl", true);


        property(ServerProperties.BV_SEND_ERROR_IN_RESPONSE, true);
        property(ServerProperties.BV_DISABLE_VALIDATE_ON_EXECUTABLE_OVERRIDE_CHECK,
                 true);
        register(OpenApiResource.class);
        register(ValidationFeature.class);
        register(DependencyBinder.class);
        register(ValidationConfigurationContextResolver.class);

        register(BlockWadlFilter.class);
    }
}
