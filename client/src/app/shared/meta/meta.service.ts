import { Injectable } from '@angular/core';
import { Meta, Title,MetaDefinition } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private title: Title, private meta: Meta) {}

  updateTitle(title: string) {
    if (title) {
      this.title.setTitle(title);
    }
  }
  
  updateDescription(description: string) {
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }
  }
  
  updateMetaTags(metaTags: MetaDefinition[]){
    metaTags.forEach(m=> this.meta.updateTag(m));
  }

}