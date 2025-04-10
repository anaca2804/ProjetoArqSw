import { EventEmitter } from "events";
import * as express from 'express'

export abstract class Router extends EventEmitter {
    abstract applyrouter(application: express.Application)

    envelope(document: any): any {
        return document
    }

    envelopeAll(document: any[], options: any = {}): any {
        return document
    }

    render(response: express.Response, next: express.NextFunction) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document)
                response.json(this.envelope(document))
            }else {
                throw({message: 'Documento não encontrado'})
            }
            return next(false)
        }
    }

    renderAll(response: express.Response, next: express.NextFunction, options: any = {}) {
        return (documents: any[]) => {
          if (documents) {
            documents.forEach((document, index, array) => {
              this.emit('beforeRender', document)
              array[index] = this.envelope(document)
            })
            response.json(this.envelopeAll(documents, options))
          } else {
            response.json(this.envelopeAll([]))
          }
          return next(false)
        }
      }
}