package com.github.joaoh4547.cachemanager.api.services;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

;

@Path("/test")
@Tag(name = "Usuários", description = "Recurso para gerenciamento de usuários")
public class TesteService {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(
            summary = "Obter usuário por ID",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Operação bem-sucedida"),
                    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
            }
    )
    public String test() {
        return "OK";
    }
}
