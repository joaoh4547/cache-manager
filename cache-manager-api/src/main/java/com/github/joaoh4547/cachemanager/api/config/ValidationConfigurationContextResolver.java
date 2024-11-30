package com.github.joaoh4547.cachemanager.api.config;


import org.glassfish.jersey.server.validation.ValidationConfig;
import org.glassfish.jersey.server.validation.internal.InjectingConstraintValidatorFactory;

import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.ContextResolver;

public class ValidationConfigurationContextResolver implements ContextResolver<ValidationConfig> {

    /**
     * Recursos de configuração
     */
    @Context
    private ResourceContext resourceContext;


    @Override
    public ValidationConfig getContext(Class<?> type) {
        final ValidationConfig config = new ValidationConfig();
        config.constraintValidatorFactory(resourceContext
                                                  .getResource(InjectingConstraintValidatorFactory.class));
        return config;

    }
}
