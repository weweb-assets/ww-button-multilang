<template>
    <wwLink class="ww-button" :ww-link="wwLang.getText(content.link)" :disabled="isEditing">
        <wwElement v-if="content.hasLeftIcon && content.leftIcon" v-bind="content.leftIcon" />
        <wwEditableText
            class="ww-button__text"
            :disabled="!canEditText"
            :model-value="content.text"
            :text-style="textStyle"
            @update:modelValue="updateText"
        />
        <wwElement v-if="content.hasRightIcon && content.rightIcon" v-bind="content.rightIcon" />
    </wwLink>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['update:content', 'update:content:effect', 'change-menu-visibility', 'change-borders-style'],
    data() {
        return {
            wwLang: wwLib.wwLang,
        };
    },
    computed: {
        canEditText() {
            /* wwEditor:start */
            return (
                this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION &&
                this.wwEditorState.isDoubleSelected &&
                !this.isTextBound
            );
            /* wwEditor:end */
            /* wwFront:start */
            // eslint-disable-next-line no-unreachable
            return false;
            /* wwFront:end */
        },
        textStyle() {
            return {
                ...(this.content.font
                    ? {
                          fontSize: 'unset',
                          fontFamily: 'unset',
                          lineHeight: 'unset',
                          fontWeight: 'unset',
                          font: this.content.font,
                      }
                    : {
                          fontSize: this.content.fontSize,
                          fontFamily: this.content.fontFamily,
                          lineHeight: this.content.lineHeight,
                          fontWeight: this.content.fontWeight,
                      }),
                textAlign: this.content.textAlign,
                color: this.content.color,
                backgroundColor: this.content.backgroundColor,
                textTransform: this.content.textTransform,
                textShadow: this.content.textShadow,
                wordSpacing: this.content.wordSpacing,
            };
        },
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        /* wwEditor:start */
        isTextBound() {
            return this.wwEditorState.boundProps['text'];
        },
        /* wwEditor:end */
    },
    /* wwEditor:start */
    watch: {
        'content.hasRightIcon': {
            async handler(hasRightIcon) {
                if (this.wwEditorState.isACopy) {
                    return;
                }
                if (hasRightIcon && !this.content.rightIcon) {
                    const uid = await wwLib.wwObjectHelper.create('ww-icon');
                    this.$emit('update:content:effect', { rightIcon: { uid, isWwObject: true } });
                }
            },
        },
        'content.hasLeftIcon': {
            async handler(hasLeftIcon) {
                if (this.wwEditorState.isACopy) {
                    return;
                }
                if (hasLeftIcon && !this.content.leftIcon) {
                    const uid = await wwLib.wwObjectHelper.create('ww-icon');
                    this.$emit('update:content:effect', { leftIcon: { uid, isWwObject: true } });
                }
            },
        },
        'content.font': {
            async handler(newVal, oldVal) {
                if (this.wwEditorState.isACopy) {
                    return;
                }
                if (!newVal && oldVal) {
                    const defaultValue = wwLib.getStyleFromToken(oldVal);
                    const typo = wwLib.getTypoFromToken(defaultValue);
                    this.$emit('update:content:effect', typo);
                } else if (newVal && newVal !== oldVal) {
                    const defaultValue = wwLib.getStyleFromToken(newVal);
                    const typo = wwLib.getTypoFromToken(defaultValue);
                    this.$emit('update:content:effect', typo);
                }
            },
        },
        canEditText() {
            const bordersStyle = {
                width: 'calc(100% + 8px)',
                height: 'calc(100% + 8px)',
                top: '-4px',
                left: '-4px',
                border: '4px solid var(--ww-color-blue-200)',
            };
            this.$emit('change-menu-visibility', this.wwEditorState.isSelected && !this.canEditText);
            this.$emit('change-borders-style', this.canEditText ? bordersStyle : {});
        },
        'wwEditorState.isDoubleSelected'(newVal, oldVal) {
            if (newVal && !oldVal && this.isTextBound) {
                wwLib.wwNotification.open({
                    text: {
                        en: 'Bound buttons cannot be edited.',
                        fr: 'Les boutons bindés ne peuvent pas être édités.',
                    },
                    color: 'purple',
                    duration: 3000,
                });
            }
        },
    },
    /* wwEditor:end */
    methods: {
        updateText(text) {
            this.$emit('update:content', { text });
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-button {
    display: flex;
    justify-content: center;
    align-items: center;
    &.button {
        outline: none;
        border: none;
        background: none;
        font-family: inherit;
        font-size: inherit;
    }
    &__text {
        cursor: inherit;
    }
}
</style>
