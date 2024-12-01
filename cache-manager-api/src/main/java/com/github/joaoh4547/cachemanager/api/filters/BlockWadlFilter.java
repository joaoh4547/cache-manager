package com.github.joaoh4547.cachemanager.api.filters;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import java.io.IOException;

public class BlockWadlFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        if (requestContext.getUriInfo().getPath().equals("application.wadl")) {
            requestContext.abortWith(javax.ws.rs.core.Response.status(404).build());
        }
    }
}
