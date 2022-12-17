import * as React from 'react'

export interface State {
  textLabel: string
  textValue: string
}

export const initialState: State = {
  textLabel: '',
  textValue: '',
}

export class ReactCircleCard extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = initialState
  }

  private static updateCallback: (data: object) => void = null

  public static update(newState: State) {
    if (typeof ReactCircleCard.updateCallback === 'function') {
      ReactCircleCard.updateCallback(newState)
    }
  }

  public state: State = initialState

  public componentWillMount() {
    ReactCircleCard.updateCallback = (newState: State): void => {
      this.setState(newState)
    }
  }

  public componentWillUnmount() {
    ReactCircleCard.updateCallback = null
  }

  render() {
    const { textLabel, textValue } = this.state

    return (
      <div className="circleCard">
        <p>
          {textLabel}
          <br />
          <em>{textValue}</em>
        </p>
      </div>
    )
  }
}
