# Component Architecture Guidelines

> This document is part of the [Project Setup Guide](../README.md). It provides detailed guidelines for component development in our application.

This document outlines the architectural principles and guidelines for component development in our application, following the Atomic Design methodology.

## Core Principles

### Pure Components First
The most important principle is to favor pure components as much as possible. This means:
- Components should be predictable and deterministic
- Same props = same output, every time
- No side effects
- No direct store/router access
- No global state dependencies

This approach brings several key benefits:
1. **Deterministic Behavior**: Developers can immediately understand what a component does by looking at its props and events
2. **Easy Testing**: Pure components are trivial to test as they only depend on their props
3. **Simplified Debugging**: When something goes wrong, you know exactly where to look
4. **Better Maintainability**: Changes are isolated and don't affect other parts of the application
5. **Improved Developer Experience**: New team members can quickly understand and contribute to the codebase

## Atomic Design Structure

Our components are organized following the Atomic Design methodology:

1. **Atoms**: The smallest building blocks (buttons, inputs, labels, etc.)
2. **Molecules**: Simple combinations of atoms (form fields, search bars, etc.)
3. **Organisms**: Complex combinations of molecules and atoms (headers, forms, etc.)

## State Management Rules

### Atoms and Molecules (Pure Components)
- Must be **stateless** (pure components)
- Should not directly interact with:
  - Store (Vuex/Pinia)
  - Router
  - Global state
  - Shared state
- Communication should be done through:
  - Props (for data)
  - Events (for actions)
- Should be highly reusable and predictable
- Should be easy to test in isolation

Example of a pure component:
```vue
<template>
  <div :class="['myButton', { 'myButton--error': props.error }]">
    <ion-button
      :disabled="props.readonly"
      color="light"
      v-bind="$attrs"
    >
      <slot></slot>
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = withDefaults(
  defineProps<{
    error: boolean;
    readonly?: boolean;
  }>(),
  {
    error: false,
    readonly: false,
  }
);

const emits = defineEmits<{
  (e: "click"): void;
}>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.myButton {
  &--error {
    --border-color: red;
    --border-style: solid;
    --border-width: 2px;
  }
}
</style>
```

### Organisms (Stateful Components)
- Can be stateful
- Can interact with:
  - Store
  - Router
  - Global state
- Can contain business logic
- Can manage global state (ex: pinia)

#### Important Note About Organisms in This Library

This library is designed as a pure components library, which means we generally avoid creating Organisms (stateful components) here. This is because:

1. **Pure Component Philosophy**: The library focuses on providing reusable, predictable, and stateless UI components
2. **Separation of Concerns**: Business logic and state management should be handled at the application level, not in the component library
3. **Better Reusability**: Pure components are more flexible and can be used in different contexts without state management constraints

**Exception: Layout Component**
The only exception to this rule is the Layout component, which is allowed to be stateful because it:
- Manages the application's theme system (black and white theme)
- Provides essential layout structure that needs to be consistent across the application
- Handles theme-related state that is fundamental to the application's appearance

This exception is carefully considered and documented to maintain the library's integrity while accommodating necessary functionality.

## Benefits of This Architecture

1. **Maintainability**: Pure components are easier to test and maintain
2. **Reusability**: Components can be reused across different contexts
3. **Predictability**: Pure components have predictable behavior
4. **Separation of Concerns**: Clear separation between UI and business logic
5. **Testing**: Easier to write unit tests for pure components
6. **Developer Experience**: Clear and deterministic code structure makes it easier for developers to:
   - Understand where to make changes
   - Predict the impact of their changes
   - Debug issues
   - Add new features
   - Maintain existing code

## Best Practices

1. Always start with a pure component (Atom/Molecule)
2. Only add state management when necessary
3. Use the Organism wrapper pattern to connect pure components to state
4. Keep business logic in Organisms or dedicated composables
5. Document props and events for all components
6. Write tests for both pure components and their wrappers
7. When contributing to the codebase:
   - Look for pure components first
   - Understand the component's props and events
   - Make changes in a way that maintains component purity
   - Use Organism wrappers to handle state when needed 
