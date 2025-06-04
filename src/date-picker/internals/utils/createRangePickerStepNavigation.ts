import {
    DateOrTimeViewWithMeridiem,
    RangePosition,
    createStepNavigation,
} from '@mui/x-date-pickers/internals';
import {UseRangePositionResponse} from '../hooks/useRangePosition';

export interface CreateStepNavigationReturnValueParameters {
    defaultView: DateOrTimeViewWithMeridiem;
    view: DateOrTimeViewWithMeridiem;
    views: readonly DateOrTimeViewWithMeridiem[];
    setView: (view: any) => void;
}

export type CreateStepNavigationReturnValue = (parameters: CreateStepNavigationReturnValueParameters) => {
    /**
     * Whether there is a next step.
     */
    hasNextStep: boolean;
    /**
     * Whether there are several steps.
     */
    hasSeveralSteps: boolean;
    /**
     * Go to the next step if any.
     */
    goToNextStep: () => void;
    /**
     * Whether the two views are in the same step.
     * @param {DateOrTimeViewWithMeridiem} viewA The first view to compare.
     * @param {DateOrTimeViewWithMeridiem} viewB The second view to compare.
     * @returns {boolean} Whether the two views are in the same step.
     */
    areViewsInSameStep: (viewA: DateOrTimeViewWithMeridiem, viewB: DateOrTimeViewWithMeridiem) => boolean;
};

export function createRangePickerStepNavigation(
    parameters: CreateRangePickerStepNavigationParameters,
): CreateStepNavigationReturnValue {
    const {steps, rangePositionResponse} = parameters;

    return createStepNavigation({
        steps,
        isViewMatchingStep: (view, step) => {
            if (step.rangePosition !== rangePositionResponse.rangePosition) {
                return false;
            }

            return step.views == null || step.views.includes(view);
        },
        onStepChange: ({step, defaultView, setView, view, views}) => {
            if (step.rangePosition !== rangePositionResponse.rangePosition) {
                rangePositionResponse.setRangePosition(step.rangePosition);
            }

            const targetView =
                step.views == null ? defaultView : step.views.find((viewBis) => views.includes(viewBis));
            if (targetView !== view) {
                setView(targetView);
            }
        },
    });
}

export interface PickerRangeStep {
    /**
     * The views that are handled inside this step.
     * If null, all views are handled by this step.
     */
    views: readonly DateOrTimeViewWithMeridiem[] | null;
    rangePosition: RangePosition;
}

interface CreateRangePickerStepNavigationParameters {
    steps: PickerRangeStep[] | null;
    rangePositionResponse: UseRangePositionResponse;
}
