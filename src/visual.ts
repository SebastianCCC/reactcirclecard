'use strict'
import powerbi from 'powerbi-visuals-api'
import { FormattingSettingsService } from 'powerbi-visuals-utils-formattingmodel'
import { VisualFormattingSettingsModel } from './settings'

import IViewport = powerbi.IViewport
import DataView = powerbi.DataView
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions
import IVisual = powerbi.extensibility.visual.IVisual
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ReactCircleCard, initialState } from './component'

import './../style/visual.less'

export class Visual implements IVisual {
  private formattingSettings: VisualFormattingSettingsModel
  private formattingSettingsService: FormattingSettingsService
  private viewport: IViewport
  private target: HTMLElement
  private reactRoot: React.ComponentElement<any, any>

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(this.formattingSettings)
  }

  constructor(options: VisualConstructorOptions) {
    this.formattingSettingsService = new FormattingSettingsService()
    this.reactRoot = React.createElement(ReactCircleCard, {})
    this.target = options.element

    ReactDOM.render(this.reactRoot, this.target)
  }

  public update(options: VisualUpdateOptions) {
    if (options.dataViews && options.dataViews[0]) {
      const dataView: DataView = options.dataViews[0]

      this.viewport = options.viewport
      const { width, height } = this.viewport
      const size = Math.min(width, height)
      this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews
      )
      const circleSettings = this.formattingSettings.circleCard

      ReactCircleCard.update({
        size,
        borderWidth: circleSettings.circleThickness.value,
        background: circleSettings.circleColor.value.value,
        textLabel: dataView.metadata.columns[0].displayName,
        textValue: dataView.single.value.toString(),
      })
    } else {
      this.clear()
    }
  }
  private clear() {
    ReactCircleCard.update(initialState)
  }
}
